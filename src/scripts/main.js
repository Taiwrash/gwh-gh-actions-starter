document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username-input').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(user => {
            document.getElementById('username').innerText = `Username: ${user.login}`;
            document.getElementById('location').innerText = `Location: ${user.location || 'Not specified'}`;

            return fetch(user.repos_url);
        })
        .then(response => response.json())
        .then(repos => {
            if (repos.length > 0) {
                const popularRepo = repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
                document.getElementById('popular-repo').innerText = `Popular Repository: ${popularRepo.name} with ${popularRepo.stargazers_count} stars`;
            } else {
                console.error('User does not have any repositories.');
            }
        })
        .catch(error => console.error('Error fetching user information:', error));
});