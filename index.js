const scores = {
  caption: "Your-score",
  length: 5,
  0: { mark: "A", color: "#007e46" },
  1: { mark: "B", color: "#6eb848" },
  2: { mark: "C", color: "#ffbf32" },
  3: { mark: "D", color: "#ff722b" },
  4: { mark: "E", color: "#ff3226" }
}

let selectedImage = null
let selectedUrl = null

addEventListener("hashchange", init)

window.addEventListener("resize", () => {
  showCursor()
})

document.addEventListener("DOMContentLoaded", init)

document.forms.parameters.elements.caption.addEventListener(
  "input",
  (event) => {
    const caption = event.target.value

    if (caption) {
      scores.caption = caption
      drawLabels()
    }
  }
)

scoreList.addEventListener("input", (event) => {
  const score = event.target.parentElement.dataset["score"]
  const name = event.target.name
  const value = event.target.value

  if (value) {
    scores[score][name] = value
    drawLabels()
    saveScores()
  }
})

preview.addEventListener("click", (event) => {
  // By starting searching from the parent we void clicks
  // on the svg element itself (which contains empty areas)
  const image = event.target.parentElement.closest("svg.label")
  if (image) {
    showCursor(image)
  } else {
    cursor.close()
  }
})

cursor.querySelector(".toolbar .copy").addEventListener("click", () => {
  const svg = getSvgDocument(selectedImage)
  navigator.clipboard
    .writeText(svg)
    .then(() => alert("Copied to clipboard!"))
    .catch(console.error)
})

function init() {
  loadScores()
  updateInputs()
  drawLabels()
}

function getSvgDocument(image) {
  return '<?xml version="1.0" standalone="no"?>\n' + image.outerHTML
}

function showCursor(image) {
  selectedImage = image
  const file = new File([getSvgDocument(selectedImage)], "label.svg", {
    type: "image/svg+xml"
  })
  if (selectedUrl) URL.revokeObjectURL(selectedUrl)
  selectedUrl = URL.createObjectURL(file)
  cursor.querySelector(".toolbar .download").href = selectedUrl

  const viewRect = viewport.getBoundingClientRect()
  const imgRect = selectedImage?.getBoundingClientRect()

  if (!imgRect) return

  cursor.style.left = imgRect.left - viewRect.left + viewport.scrollLeft + "px"
  cursor.style.top = imgRect.top - viewRect.top + viewport.scrollTop + "px"

  cursor.show()
}

function drawLabels() {
  cursor.close()

  document.title = scores.caption

  const template = document.getElementById("template")
  const preview = document.getElementById("preview")
  let oldLabel
  let newLabel

  for (let s = 0; s < Math.max(scores.length, preview.children.length); s++) {
    oldLabel = preview.children[s]
    newLabel = template.content.cloneNode(true)
    if (noMoreLabels()) break
    setScoreCaption()
    setScoreLetters()
    highlightMainScore(s)
    addNewLabel()
  }

  function noMoreLabels() {
    if (!newLabel) {
      oldLabel.remove()
      return true
    }
  }

  function setScoreCaption() {
    for (const element of newLabel.querySelectorAll(".caption"))
      element.textContent = scores.caption
  }

  function setScoreLetters() {
    for (let s = 0; s < scores.length; s++) {
      for (const mark of newLabel.querySelectorAll(`.score.s${s} text`))
        mark.textContent = scores[s].mark[0]
      for (const rect of newLabel.querySelectorAll(`.score.s${s} rect`))
        rect.style.fill = scores[s].color
    }
  }

  function highlightMainScore(s) {
    newLabel.querySelector(`.score.s${s - 1}`)?.classList.add("upper")
    newLabel.querySelector(`.main .score.s${s}`)?.classList.add("main")
    newLabel.querySelector(`.score.s${s + 1}`)?.classList.add("lower")
  }

  function addNewLabel() {
    if (oldLabel) oldLabel.replaceWith(newLabel)
    else preview.appendChild(newLabel)
  }
}

function saveScores() {
  const params = []
  for (let i = 0; i < scores.length; i++)
    params.push(`${scores[i].mark}:${scores[i].color.replace(/^\#/, "")}`)
  const state = `${encodeURIComponent(scores.caption)};${params.join(",")}`
  history.replaceState({}, undefined, `#${state}`)
}

function loadScores() {
  const state = location.hash.replace(/^\#/, "")
  if (!state) return

  const [caption, params] = state.split(";")
  scores.caption = caption
  params.split(",").forEach((param, s) => {
    const [mark, color] = param.split(":")
    scores[s] = {
      mark,
      color: `#${color}`
    }
    scores.length = s + 1
  })
}

function updateInputs() {
  document.forms.parameters.elements.caption.value = scores.caption
  for (let s = 0; s < scores.length; s++) {
    document.forms.parameters.elements.mark[s].value = scores[s].mark
    document.forms.parameters.elements.color[s].value = scores[s].color
  }
}
