import axios from "axios";
import te from "../../src/lib/ourin-error.js";

const pluginConfig = {
  name: "gangbang",
  alias: [],
  category: "nsfw",
  description: "Kirim gambar random gangbang",
  usage: ".gangbang",
  example: ".gangbang",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  await m.react("🔞");

  try {
    const response = await axios.get("https://api.ourin.my.id/api/anime-gangbang", {
      responseType: "arraybuffer",
      timeout: 30000,
    });

    const buffer = Buffer.from(response.data);

    await sock.sendMedia(m.chat, buffer, "🔞 *ɢᴀɴɢʙᴀɴɢ*", m, {
      type: "image",
    });

    await m.react("✅");
  } catch {
    await m.react("☢");
    await m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
