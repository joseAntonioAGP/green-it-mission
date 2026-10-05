const solutions = {
    answer1: "246",
    answer2: "80",
    answer3: "20",
    answer4: "245",
    answer5: "BCEF"
};

const checkButton = document.getElementById("checkButton");
const retryButton = document.getElementById("retryButton");
const result = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const scoreElement = document.getElementById("score");

function normalize(value) {
    return value.trim().toUpperCase().replace(/\s+/g, "");
}

function checkAnswers() {
    let correct = 0;

    Object.entries(solutions).forEach(([id, solution], index) => {
        const input = document.getElementById(id);
        const card = input.closest(".challenge");
        const status = document.getElementById(`status${index + 1}`);

        const isCorrect = normalize(input.value) === solution;

        card.classList.remove("correct", "incorrect");
        status.textContent = "";

        if (isCorrect) {
            correct++;
            card.classList.add("correct");
            status.textContent = "✓";
        } else {
            card.classList.add("incorrect");
            status.textContent = "✗";
        }
    });

    result.classList.remove("hidden");

    if (correct === 5) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "MISSION ACCOMPLISHED!";
        resultMessage.textContent =
            "You are the best green team ever! Congrats!";
    } else if (correct >= 3) {
        resultIcon.textContent = "🌱";
        resultTitle.textContent = "GOOD JOB!";
        resultMessage.textContent =
            "Not bad, but keep working on better solutions for the world!";
    } else {
        resultIcon.textContent = "🔧";
        resultTitle.textContent = "KEEP LEARNING!";
        resultMessage.textContent =
            "Sorry, but you need to review your green skills!";
    }

    scoreElement.textContent = `Your score: ${correct}/5`;

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function resetGame() {
    Object.keys(solutions).forEach((id, index) => {
        const input = document.getElementById(id);
        const card = input.closest(".challenge");
        const status = document.getElementById(`status${index + 1}`);

        input.value = "";
        card.classList.remove("correct", "incorrect");
        status.textContent = "";
    });

    result.classList.add("hidden");
    document.getElementById("answer1").focus();
}

checkButton.addEventListener("click", checkAnswers);
retryButton.addEventListener("click", resetGame);

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkAnswers();
        }
    });
});
