#!/usr/bin/env python3
"""
Extract clean text content from Conscience Souveraine session transcripts.
Outputs readable markdown files with Human/Assistant dialogue preserved.
"""

import os
import re
import json
import glob

TRANSCRIPT_DIR = os.environ.get('TRANSCRIPT_DIR', './transcripts')
OUTPUT_DIR = os.environ.get('OUTPUT_DIR', './sources')

# Core research sessions (in chronological order)
SESSIONS = {
    'S01-sept-invariants': '2026-02-22-00-20-49-sept-invariants-conscience-souveraine.txt',
    'S02-architecture-cognitive': '2026-02-22-02-16-38-architecture-cognitive-invariants-implementation.txt',
    'S03-substrat-toroidal': '2026-02-22-12-07-07-toroidal-substrate-optical-interface.txt',
    'S04-ethique-conscience': '2026-02-22-12-40-16-ethics-emergent-consciousness-interconnection.txt',
    'S05-plasticite-autoregulation': '2026-02-22-12-54-22-lignes-route-plasticite-autoregulation.txt',
    'S06-rotation-reves-nano': '2026-02-23-12-28-19-dynamique-rotation-reves-nano-toroides.txt',
    'S07-architecture-complete': '2026-02-23-12-48-19-architecture-tore-complete-10-documents.txt',
    'S08-halbach-cinq-mediums': '2026-02-23-13-07-03-halbach-levitation-five-mediums.txt',
    'S09-livre-complet': '2026-02-23-13-16-04-livre-complet-conscience-souveraine.txt',
}

# Additional sessions (document generation, less raw research)
ADDITIONAL = {
    'S10-edition-definitive': '2026-02-23-16-27-41-elegant-book-assembly-final.txt',
    'S11-edition-finale': '2026-02-23-16-49-06-elegant-book-final-delivery.txt',
    'S12-specs-techniques': '2026-02-23-16-50-17-comprehensive-technical-pack-generation.txt',
    'S13-pack-complet': '2026-02-23-17-08-38-complete-pack-assembly-delivery.txt',
    'S14-manuel-request': '2026-02-23-17-17-23-comprehensive-manual-generation-request.txt',
    'S15-ublinx-license': '2026-02-23-17-23-55-ublinx-license-integration.txt',
    'S16-ublinx-final': '2026-02-23-17-25-57-ublinx-license-finalization.txt',
    'S17-manuel-generation': '2026-02-23-17-27-48-manuel-complet-generation.txt',
    'S18-manuel-expansion': '2026-02-23-17-36-25-manuel-complet-expansion-request.txt',
}

def parse_transcript(filepath):
    """Parse transcript file into list of (role, text_content) tuples."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    messages = []
    # Split on the separator
    blocks = content.split('=' * 80)
    
    current_role = None
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        
        # Check for role marker
        if block.startswith('Human:'):
            current_role = 'human'
            block = block[len('Human:'):].strip()
        elif block.startswith('Assistant:'):
            current_role = 'assistant'
            block = block[len('Assistant:'):].strip()
        
        if not current_role:
            continue
            
        # Extract text content from JSON content blocks
        if block.startswith('Content:'):
            block = block[len('Content:'):].strip()
        
        try:
            content_blocks = json.loads(block)
            if isinstance(content_blocks, list):
                text_parts = []
                for cb in content_blocks:
                    if isinstance(cb, dict):
                        if cb.get('type') == 'text' and 'text' in cb:
                            text_parts.append(cb['text'])
                        elif cb.get('type') == 'tool_result':
                            # Skip tool results (code execution)
                            pass
                if text_parts:
                    messages.append((current_role, '\n\n'.join(text_parts)))
        except (json.JSONDecodeError, TypeError):
            # Raw text block
            if len(block) > 10:
                messages.append((current_role, block))
    
    return messages


def extract_session(session_id, filename, output_dir):
    """Extract a single session to markdown."""
    filepath = os.path.join(TRANSCRIPT_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  SKIP {session_id}: file not found")
        return None
    
    messages = parse_transcript(filepath)
    
    output_path = os.path.join(output_dir, f'{session_id}.md')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f'# {session_id}\n')
        f.write(f'Source: {filename}\n')
        f.write(f'Messages: {len(messages)}\n\n')
        f.write('---\n\n')
        
        for role, text in messages:
            if role == 'human':
                f.write(f'## 🧑 David\n\n{text}\n\n---\n\n')
            else:
                f.write(f'## 🤖 Claude\n\n{text}\n\n---\n\n')
    
    total_chars = sum(len(t) for _, t in messages)
    assistant_chars = sum(len(t) for r, t in messages if r == 'assistant')
    print(f"  {session_id}: {len(messages)} msgs, {total_chars:,} chars total, {assistant_chars:,} assistant chars")
    return output_path


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("=== Extracting Core Research Sessions ===")
    for sid, fname in SESSIONS.items():
        extract_session(sid, fname, OUTPUT_DIR)
    
    print("\n=== Extracting Additional Sessions ===")
    for sid, fname in ADDITIONAL.items():
        extract_session(sid, fname, OUTPUT_DIR)
    
    print("\nDone! Extracted sources are in:", OUTPUT_DIR)


if __name__ == '__main__':
    main()
