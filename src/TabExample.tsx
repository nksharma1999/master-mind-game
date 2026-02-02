import { useState } from "react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";

export const TabExample = () => {
  const [active, setActive] = useState<string>("profile");

  return (
    <>
      <Tabs value={active} onChange={setActive}>
        <Tab label="Profile" value="profile" />
        <Tab label="Settings" value="settings" />
        <Tab label="Security" value="security" />
        <Tab label="Home" value="home" />
        <Tab label="Home2" value="home2" />
      </Tabs>
    </>
  );
};
