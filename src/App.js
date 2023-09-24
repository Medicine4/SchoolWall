import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";

const CATEGORIES = [
  { name: "寻物", color: "#3b82f6" },
  { name: "寻人", color: "#ef4444" },
  { name: "表白", color: "#16a34a" },
  { name: "提问/解答", color: "#eab308" },
  { name: "交易", color: "#db2777" },
  { name: "吐槽", color: "#14b8a6" },
  { name: "分享", color: "#f97316" },
  { name: "热点", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "谁看见我的小鞋啦😭如图绿色的这一只，今天下午丢的，不知道丢在哪里了。球球友友们找找呜呜呜",
    category: "寻物",
    img: "https://gcamfziajstnnexlgztc.supabase.co/storage/v1/object/public/factImages/whereisshoes.jpg",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "或许这是你的小鞋吗？我在体育馆出来的这个拐角看到它，帮你放在路边啦~",
    img: "https://gcamfziajstnnexlgztc.supabase.co/storage/v1/object/public/factImages/shoes.jpg",
    category: "寻物",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "请问大家，三楼的肠粉早上还开吗？好想去吃",
    img: "NULL",
    category: "提问/解答",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);

  useEffect(function () {
    async function getFacts() {
      let { data: facts, error } = await supabase.from("facts").select("*");
      setFacts(facts);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main>
        <CategoryFliter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="School Wall" />
        <h1>校园墙</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => (showForm ? setShowForm(false) : setShowForm(true))}
      >
        {showForm ? "close" : "share"}
      </button>
    </header>
  );
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    // 1.prebent broser reload
    e.preventDefault();

    // 2.check if data is valid. if so, create a new fact
    if (text && category && textLength <= 200) {
      // 3. create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 10000),
        text,
        img: "NULL",
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };

      // 4. add new fact to the ui: add fact to state
      setFacts((facts) => [newFact, ...facts]);

      //5. reset input fields
      setText("");
      setImg("");
      setCategory("");

      //6. close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="写下你的信息~"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <label for="image">上传图片（可选）：</label>
      <input
        type="file"
        id="image"
        name="imageFile"
        accept="image/*"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">信息类别：</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large">post</button>
    </form>
  );
}

function CategoryFliter() {
  const categories = CATEGORIES;

  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-category">ALL</button>
        </li>
        {categories.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <li key={fact.id} className="fact">
            <p>
              {fact.text}
              <span
                className="tag"
                style={{
                  backgroundColor: CATEGORIES.find(
                    (cat) => cat.name === fact.category
                  ).color,
                }}
              >
                {fact.category}
              </span>
            </p>
            <div className="imgButton">
              {fact.img === "NULL" ? "" : <img src={fact.img} />}
              <div className="vote-button">
                <button>👍 {fact.votesInteresting}</button>
                <button>🤯 {fact.votesMindblowing}</button>
                <button>⛔️ {fact.votesFalse}</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
