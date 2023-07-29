import type { V2_MetaFunction } from "@remix-run/node";
import PastedTextContext from "~/context/PastedText";
import Turndown from "turndown";
import { useMemo, useContext } from "react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const turndown = useMemo(() => {
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
    return turndown;
  }, []);
  const value = useContext(PastedTextContext);
  const [secondaryValue, setSecondaryValue] = useState<string>(null);
  const markdown = useMemo(() => {
    return turndown.turndown(secondaryValue ? secondaryValue : value);
  }, [value, secondaryValue])
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        lineHeight: "1.4",
      }}
    >
      <div>
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
        /></div>
        <div>
          <textarea onPaste={(ev) => {
            setSecondaryValue(ev.clipboardData.getData("text/html"));
          }}></textarea>
        </div>
    </div>
  );
}
