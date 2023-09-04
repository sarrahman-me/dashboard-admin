"use client";
import { Switch } from "@headlessui/react";

function SwitchButton(props: {
  title: string;
  enabled: boolean;
  setEnabled: any;
}) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <span>{props.title}</span>
      <Switch
        checked={props.enabled}
        onChange={props.setEnabled}
        className={`${
          props.enabled ? "bg-indigo-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">{props.title}</span>
        <span
          className={`${
            props.enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </label>
  );
}

export default SwitchButton;
