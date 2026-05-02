// Reading Championship - Complete Solution

// Step 1: Create Competitors (4 competitors with book data)
const competitors = [
    {
        name: "Amina",
        books: ["The Great Gatsby", "To Kill a Mockingbird", "1984"],
        totalPages: [180, 281, 328],
        pagesRead: [180, 250, 295]
    },
    {
        name: "Omar",
        books: ["Pride and Prejudice", "The Hobbit", "Dune"],
        totalPages: [432, 310, 412],
        pagesRead: [432, 310, 412]
    },
    {
        name: "Fatima",
        books: ["Harry Potter #1", "The Alchemist", "Sapiens"],
        totalPages: [309, 208, 498],
        pagesRead: [280, 190, 450]
    },
    {
        name: "Jamal",
        books: ["The Catcher in the Rye", "Brave New World"],
        totalPages: [277, 288],
        pagesRead: [200, 220]
    }
];

// Step 2: Required Functions

/**
 * Calculate completion percentage for a single book
 * @param {number} pagesRead - Pages read for the book
 * @param {number} totalPages - Total pages in the book
 * @returns {number} Completion percentage (0-100)
 */
function calculateProgress(pagesRead, totalPages) {
    if (totalPages === 0) return 0;
    return Math.min((pagesRead / totalPages) * 100, 100);
}

/**
 * Calculate total pages read across all books for a competitor
 * @param {number[]} pagesReadArray - Array of pages read per book
 * @returns {number} Total pages read
 */
function calculateTotalPagesRead(pagesReadArray) {
    return pagesReadArray.reduce((sum, pages) => sum + pages, 0);
}

/**
 * Calculate average completion rate across all books
 * @param {number[]} pagesReadArray - Array of pages read
 * @param {number[]} totalPagesArray - Array of total pages
 * @returns {number} Average completion percentage
 */
function calculateCompletionRate(pagesReadArray, totalPagesArray) {
    if (pagesReadArray.length === 0) return 0;
    
    const completionPercentages = pagesReadArray.map((pagesRead, index) => 
        calculateProgress(pagesRead, totalPagesArray[index])
    );
    
    return completionPercentages.reduce((sum, percent) => sum + percent, 0) / 
           completionPercentages.length;
}

/**
 * Award competition points combining total pages and consistency
 * Formula: totalPages + (completionRate * 2)
 * @param {number} totalPages - Total pages read
 * @param {number} completionRate - Average completion percentage
 * @returns {number} Final competition score
 */
function awardPoints(totalPages, completionRate) {
    return Math.round(totalPages + (completionRate * 2));
}

/**
 * Assign title based on total pages read
 * @param {number} totalPages - Total pages read
 * @returns {string} Competitor title
 */
function assignTitle(totalPages) {
    if (totalPages >= 400) return "🌟 Reading Star";
    if (totalPages >= 250) return "📖 Dedicated Reader";
    return "🌱 Rising Reader";
}

// Step 3: Process Competitors and Display Results
function displayChampionshipResults() {
    console.clear();
    console.log("🏆 READING CHAMPIONSHIP RESULTS 🏆");
    console.log("=" * 60);
    console.log("");

    // Process each competitor
    const competitorResults = [];

    competitors.forEach(competitor => {
        // Calculate metrics
        const totalPagesRead = calculateTotalPagesRead(competitor.pagesRead);
        const avgCompletionRate = calculateCompletionRate(
            competitor.pagesRead, 
            competitor.totalPages
        );
        const finalScore = awardPoints(totalPagesRead, avgCompletionRate);
        const title = assignTitle(totalPagesRead);

        // Store results
        competitorResults.push({
            name: competitor.name,
            totalPagesRead,
            avgCompletionRate: Math.round(avgCompletionRate),
            finalScore,
            title
        });

        // Print individual summary
        console.log(`${competitor.name}:`);
        console.log(`  ${title} (${totalPagesRead} pages read)`);
        console.log(`  📊 ${avgCompletionRate}% average completion`);
        console.log(`  🎯 Final Score: ${finalScore}`);
        console.log("");
    });

    // Step 4: Leaderboard & Winner
    console.log("🏅 LEADERBOARD 🏅");
    console.log("-".repeat(40));

    // Sort by score (highest first)
    competitorResults.sort((a, b) => b.finalScore - a.finalScore);

    competitorResults.forEach((result, index) => {
        const rank = index === 0 ? "🥇 1st" : index === 1 ? "🥈 2nd" : index === 2 ? "🥉 3rd" : `${index + 1}th`;
        console.log(`${rank}: ${result.name} - ${result.finalScore} pts (${result.title})`);
    });

    // Declare champion
    const champion = competitorResults[0];
    console.log("");
    console.log("🎉 CHAMPION ANNOUNCED! 🎉");
    console.log(`🏆 Champion of the Reading Championship: ${champion.name} with ${champion.finalScore} points!`);
    console.log(`   ${champion.title} (${champion.totalPagesRead} pages, ${champion.avgCompletionRate}% completion)`);

    // Update HTML output
    document.getElementById('output').textContent = 
        `🏆 Champion: ${champion.name} (${champion.finalScore} pts)\n\n` +
        competitorResults.map((r, i) => 
            `${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`} ${r.name}: ${r.finalScore} pts`
        ).join('\n');
}

// Initialize championship when page loads
document.addEventListener('DOMContentLoaded', displayChampionshipResults);

// Debug: Test individual functions
console.log("\n🧪 FUNCTION TESTS 🧪");
console.log("calculateProgress(250, 281):", calculateProgress(250, 281));
console.log("calculateTotalPagesRead([180, 250, 295]):", calculateTotalPagesRead([180, 250, 295]));
console.log("awardPoints(725, 85):", awardPoints(725, 85));