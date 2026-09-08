import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
export default function Markdown({
    body,
}: {
    body: null | string | undefined;
}) {
    return (
        <div className="prose">
            <ReactMarkdown
                components={{
                    a: ({ children, ...props }) => (
                        <a {...props} rel="noopener noreferrer">
                            {children}
                        </a>
                    ),
                    img: ({ alt, ...props }) => (
                        <img {...props} alt={alt || ''} loading="lazy" />
                    ),
                }}
                skipHtml
                urlTransform={defaultUrlTransform}
            >
                {body || ''}
            </ReactMarkdown>
        </div>
    );
}
