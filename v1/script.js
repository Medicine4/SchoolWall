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
    img: "",
    category: "提问/解答",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".facts-list");

factList.innerHTML = "";

loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://gcamfziajstnnexlgztc.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW1memlhanN0bm5leGxnenRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NjQ3MDQsImV4cCI6MjAxMDU0MDcwNH0.d4JPhRvd_EbsOVIB7lOBdyyN8u9lgwMvLTTd-rwHkB4",
        authorization:
          "Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW1memlhanN0bm5leGxnenRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NjQ3MDQsImV4cCI6MjAxMDU0MDcwNH0.d4JPhRvd_EbsOVIB7lOBdyyN8u9lgwMvLTTd-rwHkB4",
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
}

// createFactsList(initialFacts);

function createFactsList(dataArr) {
  const htmlArr = dataArr.map(
    (el) =>
      `<li class="fact">
                <p>${el.text}
                    <span class="tag" style="background-color: ${
                      CATEGORIES.find((cat) => cat.name === el.category)?.color
                    };">${el.category}</span>
                </p>
                <div class="imgButton">${haveImg(el)}
                    
                    <div class="vote-button">
                        <button>👍 24</button>
                        <button>🤯 9</button>
                        <button>⛔️ 4</button>
                    </div>
                </div>
            </li>`
  );

  console.log(htmlArr);
  const html = htmlArr.join("");
  factList.insertAdjacentHTML("afterbegin", html);
}

function haveImg(fact) {
  if (fact.img === "NULL") {
    return "";
  } else {
    return `<img src=${fact.img} alt="">`;
  }
}

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "share";
  }
});
