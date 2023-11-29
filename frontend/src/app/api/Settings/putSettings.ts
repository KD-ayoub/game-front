import { SettingsType } from "@/app/types/settingsType";

export default async function PutSettings(data: SettingsType) {
    const response = await fetch("http://localhost:3001/settings/update_data", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      // console.log("resss:",await response.json());
      return await response.json();
}