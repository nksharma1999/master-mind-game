import type { ReactNode } from "react";
import { Tab } from "./Tab";

type TabsProps = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};
export const Tabs = ({ value, onChange, children }: TabsProps) => {
  return (
    <div>
      {Array.isArray(children) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children.map((child: any) => {
          if (child.type !== Tab) return null;
          return (
            <Tab
              key={child.props.value}
              label={child.props.label}
              value={child.props.value}
              isActive={child.props.value == value}
              onClick={() => onChange(child.props.value)}
            />
          );
        })}
    </div>
  );
};
