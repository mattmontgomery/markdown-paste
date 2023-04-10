import type { V2_MetaFunction } from "@remix-run/node";
import PastedTextContext from "~/context/PastedText";
import Turndown from "turndown";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const turndown = new Turndown({});
  turndown.addRule("htmlExtras", {
    filter: ["span"],
    replacement: (content, node, options) => {
      const n = node as HTMLElement;
      let returnedString = content;
      console.log(n.style.fontStyle);
      const isBold = Number(n.style.fontWeight) > 400;
      const isItalic = n.style.fontStyle === "italic";

      if (isBold) {
        returnedString = `**${returnedString}**`;
      }
      if (isItalic) {
        returnedString = `_${returnedString}_`;
      }
      return returnedString;
    },
  });
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        lineHeight: "1.4",
      }}
    >
      <PastedTextContext.Consumer>
        {(value) => {
          const markdown = turndown.turndown(value);
          return (
            <>
              <textarea
                readOnly
                rows={20}
                style={{
                  fontFamily: "monospace",
                  margin: 0,
                  flex: 1,
                }}
                value={markdown}
              />
              <textarea
                readOnly
                rows={20}
                style={{
                  fontFamily: "monospace",
                  margin: 0,
                  flex: 1,
                }}
                value={value}
              />
            </>
          );
        }}
      </PastedTextContext.Consumer>
    </div>
  );
}
