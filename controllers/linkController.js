import Link from "../models/Link.js";
import { customAlphabet } from "nanoid";

// Configuración de nanoid
const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8);

export const createShorturl = async (req, res) => {
  const { url, customShortUrl } = req.body;

  try {
    let shortUrl;

    if (customShortUrl) {
      const existingLink = await Link.findOne({ shortUrl: customShortUrl });
      if (existingLink) {
        return res.status(400).json({ error: "Short URL already exists" });
      }
      shortUrl = customShortUrl;
    } else {
      shortUrl = nanoid();
    }

    const newLink = new Link({ url, shortUrl });
    await newLink.save();

    res.status(201).json({
      message: "Short URL created successfully",
      data: { id: newLink.id, url: newLink.url, shortUrl: newLink.shortUrl },
    });
    //save the data to the database
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Buscar la URL corta en la base de datos
    console.log("Short URL received:", shortUrl);
    const link = await Link.findOne({ shortUrl });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Verificar si 'link' es un documento de Mongoose
    if (!link.save) {
      console.error("link is not a Mongoose document", link);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Incrementar el contador de clics
    link.clicks += 1;
    await link.save();

    // Redirigir a la URL original
    res.redirect(link.url);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    //does the shortUrl exist?
    const deletedLink = await Link.findOneAndDelete({ shortUrl });

    if (!deletedLink) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res
      .status(200)
      .json({ message: "Short URL deleted successfully", data: deletedLink });
  } catch (error) {
    console.log("Error deleting:", error);
    res.stats(500).json({ error: error.message });
  }
};

export const getUrls = async (req, res) => {
  try {
    console.log("Fetching URLs...");
    const urls = await Link.find();
    console.log("URLs fetched:", urls);
    res.status(200).json({
      message: "URLs fetched successfully",
      data: urls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUrlByShortUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const link = await Link.findOne({ shortUrl });
    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({
      message: "Short url fetched successfully",
      data: { url: link.url },
    });
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const { newUrl } = req.body;

  try {
    if (!newUrl) {
      return res.status(400).json({ error: "New URL is required" });
    }

    const updatedLink = await Link.findOneAndUpdate(
      { shortUrl },
      { url: newUrl },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({
      message: "URL updated successfully",
      data: updatedLink,
    });
  } catch (error) {
    console.error("Error updating URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateShortUrl = async (req, res) => {
  const { url } = req.body;
  const { newShortUrl } = req.body;

  try {
    if (!newShortUrl) {
      return res.status(400).json({ error: "New short URL is required" });
    }

    const updatedLink = await Link.findOneAndUpdate(
      { url },
      { shortUrl: newShortUrl },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({
      message: "Short URL updated successfully",
      data: updatedLink,
    });
  } catch (error) {
    console.error("Error updating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
