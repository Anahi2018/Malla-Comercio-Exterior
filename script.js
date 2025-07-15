document.querySelectorAll('.subject').forEach(subject => {
    subject.addEventListener('click', () => {
        if (!subject.classList.contains('approved')) {
            subject.classList.add('approved');
            unlockPrerequisites(subject);
        }
    });
});
function unlockPrerequisites(subject) {
    const prerequisite = subject.getAttribute('data-prerequisite');
    if (prerequisite) {
        const prerequisites = document.querySelectorAll('.subject');
        prerequisites.forEach(prereq => {
            if (prereq.textContent === prerequisite && !prereq.classList.contains('approved')) {
                prereq.classList.add('approved');
                unlockPrerequisites(prereq);
            }
        });
    }
}



               
