document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat-box');

    // predefined questions
    const predefinedQuestions = [
        "Hi",
        "Tell me about SciAstra's educational programs.",
        "How can I get involved with SciAstra?",
        "Is SciAstra a sponsor of IISER TVM?",
        "Why should I join SciAstra?",
        "What courses does SciAstra offer for IISC, IISER, NISER, ISI, CMI, CEBS, IACS?",
        "Who are the mentors at SciAstra?",
        "Can I access SciAstra courses offline?",
        "Tell me about SciAstra's community events.",
        "How do i contact the SciAstra support team?",
        "Is there a mobile app for SciAstra?",
    ];

    predefinedQuestions.forEach(question => {
        chatBox.innerHTML += `<div class="bot-message"><strong>SciAstra Bot:</strong> ${question}</div>`;
    });

    // Bot reaponse
    chatBox.addEventListener('click', (event) => {
        if (event.target.classList.contains('bot-message')) {
            const clickedQuestion = event.target.textContent.trim().replace('>SciAstra Bot:', '');
            sendUserMessage(clickedQuestion);
        }
    });

    sendButton.addEventListener('click', () => {
        sendMessage();
    });
});

async function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    var chatBox = document.getElementById("chat-box");
    var userMessage = `<div class="user-message"><strong>User:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    setTimeout(function () {
        var botResponse = generateBotResponse(userInput);
        chatBox.innerHTML += `<div class="bot-message"><strong>SciAstra Bot:</strong> ${botResponse}</div>`;
    }, 500);

    document.getElementById("user-input").value = "";
}

function sendUserMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var userMessage = `<div class="user-message"><strong>User:</strong> ${message}</div>`;
    chatBox.innerHTML += userMessage;

    setTimeout(function () {
        var botResponse = generateBotResponse(message);
        chatBox.innerHTML += `<div class="bot-message"><strong>SciAstra Bot:</strong> ${botResponse}</div>`;
    }, 500);
}

function generateBotResponse(userMessage) {
    if (userMessage.toLowerCase().includes('services') && userMessage.toLowerCase().includes('offer')) {
        return "SciAstra offers a range of services, including educational programs, workshops, and consulting services. You can explore our website for detailed information on each service.";
    } else if (userMessage.toLowerCase().includes('educational programs')) {
        return "SciAstra provides various educational programs focused on science, technology, engineering, and mathematics (STEM). Our programs aim to inspire and educate individuals of all ages. For more details, you can visit our [Materials](https://www.sciastra.com/materials) page.";
    } else if (userMessage.toLowerCase().includes('get involved')) {
        return "Getting involved with SciAstra is easy! You can participate in our events, join our community, or explore volunteer opportunities. Check our website for the latest updates on upcoming events and ways to contribute. Visit our [Teams](https://www.sciastra.com/teams) page to learn more about our team members.";
    } else if (userMessage.toLowerCase().includes('sponsor of iiser tvm')) {
        return "Yes, SciAstra is now the official sponsor of Anvesha, the Science Fest of IISER TVM. We are dedicated to supporting and collaborating with educational institutions and events.";
    } else if (userMessage.toLowerCase().includes('join sciastra')) {
        return "Join the Community! SciAstra is the biggest community of science scholars in India for IISER Aptitude test (IAT), National Entrance Screening Test (NEST), ISI, CMI, and IACS. We provide valuable resources, live classes, course materials, tests, and a supportive community for your educational journey.";
    } else if (userMessage.toLowerCase().includes('courses does sciastra offer')) {
        return "SciAstra offers the best courses for IISc, IISER, NISER, ISI, CMI, CEBS, and IACS. Explore our courses to prepare for exams like IAT, NEST, KVPY, ISI, and more. Visit our [Courses](https://www.sciastra.com/) page for detailed information.";
    } else if (userMessage.toLowerCase().includes('mentors at sciastra')) {
        return "SciAstra has experienced mentors with diverse backgrounds in science and education. Our mentors are dedicated to helping you succeed in your academic journey. You can learn more about our mentors on the [Team](https://www.sciastra.com/team) page.";
    } else if (userMessage.toLowerCase().includes('access sciastra courses offline')) {
        return "Yes, you can access SciAstra courses offline. We provide downloadable materials and resources for offline learning. Ensure you download the necessary content before going offline.";
    } else if (userMessage.toLowerCase().includes('community events')) {
        return "SciAstra organizes various community events, including webinars, workshops, and meet-ups. Stay tuned to our [Events](https://www.sciastra.com/events) page for updates on upcoming events and opportunities to connect with the SciAstra community.";
    } else if (userMessage.toLowerCase().includes('contact sciastra support team')) {
        return "For assistance, you can contact the SciAstra support team via email at support@sciastra.com or through our [Contact](https://www.sciastra.com/contact) page. Our team is ready to help with any inquiries or concerns you may have.";
    } else if (userMessage.toLowerCase().includes('mobile app for sciastra')) {
        return "Currently, SciAstra does not have a dedicated mobile app. However, our website is designed to be mobile-friendly, allowing you to access resources and participate in community activities on your mobile device.";
    } else {
        return "Thanks for your message! If you have specific questions, feel free to ask, and I'll do my best to assist you.";
    }
}

// resize height for desktop
let isResizing = false;

function startDrag(e) {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDrag);
}

function handleMouseMove(e) {
    if (isResizing) {
        const newHeight = Math.min(550, window.innerHeight - e.clientY);
        document.getElementById('chat-container').style.height = `${newHeight}px`;
    }
}

function stopDrag() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopDrag);
}