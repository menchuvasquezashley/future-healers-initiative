// FHI simple progress system

function getPoints() {
  return Number(localStorage.getItem("fhiPoints")) || 0;
}

function addPoints(amount) {
  let points = getPoints();
  points += amount;

  localStorage.setItem("fhiPoints", points);

  return points;
}

function getRaffleEntries() {
  return Math.floor(getPoints() / 10);
}

function updateJourney() {
  const points = getPoints();

  const pointsDisplay = document.getElementById("points");
  const raffleDisplay = document.getElementById("raffle");

  if (pointsDisplay) {
    pointsDisplay.textContent = points;
  }

  if (raffleDisplay) {
    raffleDisplay.textContent = getRaffleEntries();
  }

  updateBadges(points);
}

function updateBadges(points) {

  const badges = [
    {
      id: "badge1",
      needed: 1
    },
    {
      id: "badge2",
      needed: 5
    },
    {
      id: "badge3",
      needed: 10
    },
    {
      id: "badge4",
      needed: 15
    },
    {
      id: "badge5",
      needed: 20
    }
  ];

  badges.forEach(function(badge) {

    const element = document.getElementById(badge.id);

    if (!element) return;

    if (points >= badge.needed) {
      element.style.opacity = "1";
      element.style.border = "2px solid #1769aa";
    } else {
      element.style.opacity = "0.4";
    }

  });
}


// Ask page
function submitQuestion() {

  const question = document.getElementById("question");

  if (!question || question.value.trim() === "") {
    alert("Please enter a question first!");
    return;
  }

  localStorage.setItem("fhiLastQuestion", question.value);

  addPoints(1);

  alert("✅ Your question was saved! Thanks for asking.");

  question.value = "";
}


// Get Involved page
function submitIdea() {

  const idea = document.getElementById("idea");

  if (!idea || idea.value.trim() === "") {
    alert("Tell us your idea first!");
    return;
  }

  localStorage.setItem("fhiLastIdea", idea.value);

  addPoints(1);

  alert("🎉 Thanks! Your idea was saved.");

  idea.value = "";
}


// Run when the page loads
document.addEventListener("DOMContentLoaded", function() {
  updateJourney();
});
