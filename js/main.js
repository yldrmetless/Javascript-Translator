const fromText = document.querySelector(".from-text"),
      toText = document.querySelector(".to-text"),
      selectTag = document.querySelectorAll("select"),
      exchange = document.querySelector(".exchange"),
      translate = document.querySelector("button")
      icons = document.querySelectorAll("i")



selectTag.forEach((tag, id) => {
    for(const langCode in languages){
        // console.log(languages[langCode]);
        let selected;

        if(id == 0 && langCode == "en-UK"){
            selected = "selected"
        }
        else if(id == 1 && langCode == "tr-TR"){
            selected = "selected"
        }

        let option = `<option value = "${langCode}" ${selected}>${languages[langCode]}</option>`

        tag.insertAdjacentHTML("beforeend", option)
    }
});

translate.addEventListener("click",() => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value

        // console.log(text, translateFrom, translateTo);

        if(!text) return;
        toText.setAttribute("placeholde", "Translating")

    let API = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

    fetch(API).then(res => res.json()).then(data => {
        // console.log(data);

        toText.value = data.responseData.translatedText
        toText.setAttribute("placeholde", "Translating")
    })

})

exchange.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang;
    fromText.value = toText.value
    toText.value = tempText
})

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        // console.log(target);
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value)
            }
            else{
                navigator.clipboard.writeText(toText.value)
            }
        }
        else{
            let speaker;
            if(target.id == "from"){
                speaker = new SpeechSynthesisUtterance(fromText.value)
                speaker.lang = selectTag[0].value
            }
            else{
                speaker = new SpeechSynthesisUtterance(toText.value)
                speaker.lang = selectTag[1].value
            }
            speechSynthesis.speak(speaker)

            
        }
    })
})
