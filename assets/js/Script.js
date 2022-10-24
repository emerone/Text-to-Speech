const 
textarea = document. querySelector ("textarea"),
voiceList = document. querySelector ("select"),
speechBtn = document. querySelector ("button")

let 
synth = speechSynthesis

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value != ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
    }
})

const localBtn = document.querySelector("label:nth-of-type(1) > input")

function textLocal() {

    // when btn checked add true and textarea in storage if not empty
    // and false when not uncheck
    localBtn?.addEventListener('input', () => {
        if (localBtn.checked == true) {
            localStorage.setItem('localBtn', 'true')
    
            textarea.value != false ? 
            localStorage.setItem('textarea', textarea.value) :
            textarea.value = localStorage.getItem('textarea')

        }else{
            localStorage.setItem('localBtn', 'false')
        }
    })

        // put the value in storage when adding text
    textarea.addEventListener('input', () => {
        if (localBtn.checked == true){
            localStorage.setItem('textarea', textarea.value)
        }
    })
    
    voiceList.addEventListener('input', () => {
        if ( localBtn.checked == true){
            localStorage.setItem('voiceList', voiceList.value)
        }
    })

        // check if input is checked put the value 
    if (localStorage.getItem("localBtn") == 'true') {
        localBtn.checked = true
        textarea.value = localStorage.getItem('textarea')

        document.addEventListener('laod', () => {
            voiceList.value = localStorage.getItem('voiceList') 
        })
        setTimeout(() => {
        },250)
    }
}

textLocal()

setTimeout(() =>{
    console.log(voiceList.value)
}, 500)