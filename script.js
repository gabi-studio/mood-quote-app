// set up page when window loads
window.onload = setupPage;

// function to set up page, get html elements, set up variables, andevent listeners for buttons
function setupPage() {
    // get the buttons container, mood buttons, a quotes object with properties that contain the quotes (maybe an array per emotion)
    var buttonsContainer = document.querySelector(".buttons-container"); // the container div that contains all the emotion buttons
    var quoteSection = document.getElementById("quote-section"); // the quote section that is initially hidden but will contain quote when button is clicked
    var copyButton = document.getElementById("copy-quote-button");
    var exitButton = document.getElementById("exit-quote-button");
    var quoteText = document.getElementById("quote-text"); // the actual quote text
    var appTitle = document.getElementById("app-title"); // InspireMe
    var appInstructions = document.getElementById("app-instructions");  // instructions for how to use app
    var copyMessage = document.getElementById("copy-message"); // "quote copied! success/fail message"

    // a quotes object
    // each property is an emotion that corresponds to the buttons
    // each emotion is an array of quotes, from which the quote will be randomly selected when the matching button is clicked
    var quotes = {
        calm: [
            "Breathe deeply, for every exhale takes stress away. Peace is within your reach—embrace it now.",
            "The stillness you seek is already inside you. Let go, and let calm flow through you.",
            "Even the ocean, with its waves, finds moments of stillness. Let yourself be like water, flowing and serene.",
            "Calmness is a superpower—stay grounded, and you will weather any storm.",
            "Inhale peace, exhale worry. The moment you stop resisting, serenity will find you.",
            "You deserve to feel calm. Take a moment to pause, reflect, and breathe deeply.",
            "Quiet the noise around you, and you'll hear the wisdom within. Embrace the power of silence.",
            "Patience and calm are the wings that carry you through chaos. Trust in your inner strength."
        ],
        happy: [+
            "Happiness grows when you savor the small joys. Shine brightly and spread your light!",
            "Your smile has the power to brighten any room. Embrace the beauty of this moment.",
            "Joy is contagious—share yours freely, and watch the world respond with kindness.",
            "You are a magnet for happiness. Let positivity flow through every part of your day.",
            "Life is a collection of beautiful moments; treasure this one. Happiness is here for you.",
            "You deserve all the joy this world has to offer. Embrace it fully and without hesitation.",
            "When you choose gratitude, happiness will follow. Count your blessings and smile.",
            "Happiness isn't found, it's created. You have everything you need to make today amazing."
        ],
        motivated: [
            "Every step forward is progress, no matter how small. You are capable of achieving greatness.",
            "Rise above doubt and take action. You hold the power to turn dreams into reality.",
            "Your potential is limitless. Push through the challenges, and you'll achieve the extraordinary.",
            "Hard work always pays off—stay focused and trust the process. You've got this!",
            "Success starts with the courage to begin. Take that first step today.",
            "Every challenge is an opportunity to grow. Embrace the grind and shine brighter.",
            "You are stronger than you think. Keep moving forward, and the rewards will follow.",
            "Effort never goes unnoticed. Believe in yourself, and the world will believe in you too."
        ],
        excited: [
            "The future holds endless possibilities—embrace the thrill of what's to come! Let your passion ignite your journey.",
            "Your energy is contagious—use it to chase your wildest dreams. The best is yet to come!",
            "Excitement is the spark of life. Let it guide you toward new adventures.",
            "Celebrate the present and look forward to the adventure ahead. You are unstoppable!",
            "Feel the rush of potential within you—anything is possible. Seize the moment!",
            "Your dreams are within reach. Be bold, be daring, and let excitement fuel your way.",
            "Today is your canvas—paint it with vibrant colors of possibility. The world is waiting!",
            "Anticipation is a gift. Use it to propel yourself into the amazing journey ahead."
        ],
        angry: [
            "Pause and breathe; your calm mind is your greatest strength. Respond with intention, not reaction.",
            "Anger is a passing storm—let it fuel your growth, not control your actions.",
            "Step back and let the heat subside. In clarity, you will find the right path forward.",
            "You are not your anger. Let it pass, and your true strength will shine through.",
            "Find peace in letting go. Forgiveness is for your freedom, not theirs.",
            "Channel your energy into solutions, not frustrations. You have the power to overcome.",
            "Anger is a signal; listen to it, but don't let it rule you. You are in control.",
            "Even the fiercest fire can cool. Take time to breathe and find your center."
        ],
        anxious: [
            "You are stronger than your worries; one breath at a time, you can rise above them. Trust in the present moment.",
            "Fear fades when you focus on now. Let go of what you can't control and find peace.",
            "Anxiety is a visitor—it comes and goes. Let it pass without giving it a home.",
            "The storm in your mind is temporary. Calmness and clarity will return.",
            "You’ve faced hard times before and come out stronger. Trust in your resilience.",
            "Focus on what you can do, not what you fear. You are more powerful than you know.",
            "One moment at a time, you are moving forward. Let go of the need for perfection.",
            "Peace is a breath away. Close your eyes, inhale deeply, and exhale the tension."
        ],
        sad: [
            "It's okay to feel this way; brighter days are on the horizon. You are never alone in this journey.",
            "Every tear brings healing. Remember, even the darkest nights lead to the dawn.",
            "Your sadness is valid, but it doesn't define you. Brighter moments are coming.",
            "Let yourself grieve, but also let yourself heal. Time and love will guide you.",
            "Even flowers bloom after rain. Your struggles will lead to growth and beauty.",
            "You are not alone—reach out, and let others remind you of your strength.",
            "It's okay to rest. Healing takes time, and you're allowed to take it slow.",
            "Sadness is part of the journey, not the destination. Hope will find its way back to you."
        ],
        tired: [
            "Rest is not weakness; it's your body's way of recharging for greatness. Listen to what you need.",
            "Even the sun rests to shine again tomorrow. Take your time—you're allowed to pause.",
            "Tiredness is a sign of effort. Rest now, and rise stronger tomorrow.",
            "You’ve given so much; now give yourself the gift of rest. You’ve earned it.",
            "Pause and recharge—you're doing your best, and that’s enough for today.",
            "Listen to your body’s whispers before they become shouts. Rest is essential for growth.",
            "Fatigue doesn’t diminish your worth. Rest, recover, and keep moving forward.",
            "Sleep and self-care are acts of strength. Honor your needs, and success will follow."
        ]
        // note - all quotes content is from my personal collection of quotes that I used to create posts on a personal non-academic social media project 
    };
    
    // instead of adding individual event listeners for each button
    // i am using queryselectorall and iterating through each button on the initial page/ buttons container 
    // for my reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    // the copy and exit buttons should not be visible yet because they are in the quote sectiond div
    // when the emotion buttons are clicked, it will execute the function that shows a corresponding quote/makes the "quote box visible"
    var moodButtons = document.querySelectorAll("button");
    for (var i = 0; i < moodButtons.length; i++) {
        moodButtons[i].onclick = showQuote; 
    }


    // function to display a quote for the selected emotion when the button click event is triggered
    // the onclick even object is passed on to the show quote function
    // here i am using event.target.clasName to reference the button class name that triggered the onlick event
    // for my reference: https://developer.mozilla.org/en-US/docs/Web/API/Event
    // for my rererence: https://developer.mozilla.org/en-US/docs/Web/API/Event/target

    function showQuote(event) {
        // get the emotion from the button's class
        // split by the - and uses the second index of the split 
        // note to from the html file: button classes are named "button-calm", "button-happy", etc.
        var emotionClass = event.target.className.split("-")[1]; 

        // access the array that corresponds to the emotion of the button clicked
        var emotionQuotes = quotes[emotionClass];

        // use Math random to generate a random number
        // the random number is based on however many quotes the array will contain (5-10 maybe?)
        // the random number will be used as an index to acccess the emotions array so that the quote selected is random
        // asign quote to variable to access as a string later 
        var randomQuote = emotionQuotes[Math.floor(Math.random() * emotionQuotes.length)];

        
        //console.log(emotionClass);
        //console.log(randomQuote);

        // change background image based on the selected emotion

        // this is a backgrounds object with properties that contain the url for the background images for the corresponding emotion
        var backgrounds = {
            calm: "#F7E7CE",
            happy: "#facb8a",
            motivated: "#fdb893",
            excited: "#febdb3",
            angry: "#fab8a7",
            anxious: "#FBD2FA",
            sad: "#DDE6FF",
            tired: "#E8E3F8"
        };

        // change style to be the background matching the emotion
        document.body.style.background = `${backgrounds[emotionClass]}`;

    
        // make the title, instructions, and buttons hidden

        // setting the opacity to 0 so that on the css I can add an ease in transition to make it looks like it's "fading"
        buttonsContainer.style.opacity = "0";
        appTitle.style.opacity = "0";
        appInstructions.style.opacity = "0";

        // here i'm using setTimeout to wait a little bit for the fade to happen completely before displaying the quote
        setTimeout(function () {
            buttonsContainer.style.display = "none";
            appTitle.style.visibility = "hidden";
            appInstructions.style.visibility = "hidden";

            // make the quote section visible
            quoteSection.style.display = "flex"; // not block because the quote section container is using flexbox
            quoteSection.classList.add("visible");
             // for my reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
            // use classList.remove to remove this class later (to make quote section invisible again)
            quoteSection.style.opacity = "1"; 

            //console.log(quoteText);
            //console.log(randomQuote);

            // update the quote text to the random quote that corresponds to the emotion button clicked
            quoteText.innerHTML = `"${randomQuote}"`; 
            //console.log(quoteText);

            // hide the copy message text 
            copyMessage.style.display = "none";
        }, 1000); 
    }


// source of the base Clipboard API code: https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/
// when the copy button is clicked, it calls this function that copies that quote text to clipboard
copyButton.onclick = function () {
    var quote = quoteText.innerHTML; // get the content of the quote text
    navigator.clipboard.writeText(quote).then(function () {
        // update copy message to "quote copied"
        copyMessage.innerHTML = "Quote copied!"; 
        copyMessage.style.display = "block";
        setTimeout(function () {
            // hide the copy message after some time
            copyMessage.style.display = "none";
        }, 2000); 
    }).catch(function (err) {
        console.error("Could not copy quote: ", err);
    });
};

// function to close the quote section and reset the background to the home page background-glow
// like the opposite of the show quote function
exitButton.onclick = function () {
    quoteSection.style.opacity = "0";

    setTimeout(function () {
        quoteSection.classList.remove("visible");
        quoteSection.style.display = "none";

        // reset the background to the home page url
        document.body.style="background-color: #fdfaf8;";

        // show the emotion buttons, title, and instructions again
        buttonsContainer.style.display = "flex";
        buttonsContainer.style.opacity = "1";
        appTitle.style.visibility = "visible";
        appTitle.style.opacity = "1";
        appInstructions.style.visibility = "visible";
        appInstructions.style.opacity = "1";
    }, 1000); 
};

}

