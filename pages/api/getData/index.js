import { Ref } from "faunadb";
import faunadb from "faunadb";
const secret = "fnAEwNyVx2ACSVeeE9tHo9U7pG7PiQav5mYY9XhE";
const q = faunadb.query;
const client = new faunadb.Client({
  secret,
});

module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("todos"))),
        q.Lambda("doc", q.Get(q.Var("doc")))
      )
    );

    res.status(200).json(dbs.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
