
// A very simple serializer for Lexical Rich Text from Payload
// This is not a complete implementation, but it's enough for simple text.
export function payloadRichTextLexicalSerializer(nodes: any): string {
    let text = '';
    if (nodes && nodes.root && nodes.root.children) {
        for (const child of nodes.root.children) {
            if (child.type === 'paragraph') {
                for (const grandchild of child.children) {
                    if (grandchild.type === 'text') {
                        text += grandchild.text;
                    }
                }
                text += '\n';
            }
        }
    }
    return text.trim();
}
