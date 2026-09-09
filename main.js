function getData(form) {
    const formData = new FormData(form);

    const dayMeals = formData.get('daymeals');
    const programMeals = formData.get('programmeals');
    const skipEatOption = formData.get('skipeatoption');
    const skippedOrEatenMeals = formData.get('skippedoreatenmeals');

    const weeklyMealTotal = dayMeals*7 - programMeals;
    let finalPercentage;
    if (skipEatOption == 'skip') {
        finalPercentage = (weeklyMealTotal - skippedOrEatenMeals)/weeklyMealTotal * 100;
    } else if (skipEatOption == 'eat') {
        finalPercentage = skippedOrEatenMeals/weeklyMealTotal * 100;
    }

    const results = document.getElementById('results');
    results.style.display = 'block';
    results.textContent = 'Results: You completed ' + finalPercentage.toFixed(2) + '% of meal plan outside of program';

    /* debugging */
    for(const pair of formData.entries()) {
        console.log(pair[0] + " " + pair[1]);
    }
    console.log("weeklyMealTotal " + weeklyMealTotal);
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("dayMealsForm").addEventListener("submit", function(e) {
        e.preventDefault();
        getData(e.target);
    });
});