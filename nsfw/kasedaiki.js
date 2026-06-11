import axios from "axios";
import te from "../../src/lib/ourin-error.js";

const pluginConfig = {
  name: "kasedaiki",
  alias: [],
  category: "nsfw",
  description: "Kirim gambar random kasedaiki",
  usage: ".kasedaiki",
  example: ".kasedaiki",
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
    const response = await axios.get("https://api.ourin.my.id/api/kasedaiki", {
      responseType: "arraybuffer",
      timeout: 30000,
    });

    const buffer = Buffer.from(response.data);

    await sock.sendMedia(m.chat, buffer, "🔞 *ᴋᴀsᴇᴅᴀɪᴋɪ*", m, {
      type: "image",
    });

    await m.react("✅");
  } catch {
    await m.react("☢");
    await m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
