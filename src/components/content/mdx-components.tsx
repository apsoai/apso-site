import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-h1 text-fg-1 mb-6 mt-10" {...props} />,
  h2: (props) => <h2 className="text-h2 text-fg-1 mb-4 mt-8" {...props} />,
  h3: (props) => <h3 className="text-h3 text-fg-1 mb-3 mt-6" {...props} />,
  p: (props) => <p className="text-fg-3 leading-relaxed mb-4" {...props} />,
  a: (props) => (
    <a className="text-brand hover:text-brand-hover underline" {...props} />
  ),
  ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-fg-3" {...props} />,
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-fg-3" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-brand pl-4 my-4 text-fg-4 italic"
      {...props}
    />
  ),
  code: (props) => {
    const isInline = typeof props.children === "string";
    if (isInline) {
      return (
        <code className="bg-bg-2 text-fg-2 rounded px-1.5 py-0.5 text-[14px] font-mono" {...props} />
      );
    }
    return <code {...props} />;
  },
  pre: (props) => (
    <pre className="bg-navy text-white/90 rounded-lg p-4 mb-4 overflow-x-auto text-[14px] font-mono leading-relaxed" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-8 rounded-lg border border-line-1">
      <table className="w-full min-w-[560px] border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="bg-bg-1 text-left px-4 py-3 border-b border-line-1 font-display font-bold text-fg-1" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 border-b border-line-1 align-top text-fg-3 leading-relaxed" {...props} />
  ),
  hr: () => <hr className="my-8 border-line-1" />,
  strong: (props) => <strong className="font-semibold text-fg-1" {...props} />,
};
