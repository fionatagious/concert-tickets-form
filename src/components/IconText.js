import { Icon } from "@blueprintjs/core";

export default function IconText({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 my-1">
      <Icon icon={icon} />
      {text}
    </span>
  );
}
