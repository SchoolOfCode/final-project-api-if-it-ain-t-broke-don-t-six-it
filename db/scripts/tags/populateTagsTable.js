import query from "../../connection.js";
import { tags } from "../../data/tagsData.js";

async function populateTagTable() {
  tags.forEach(async (tag) => {
    const response = await query(`INSERT INTO tag (tag) VALUES ($1)`, [tag]);
    console.log("tag table populated as", response.rows);
  });
}

populateTagTable();
