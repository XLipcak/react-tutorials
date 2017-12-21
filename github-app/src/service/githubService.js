const url = 'https://api.github.com/search/users?access_token=a8cf9b8a240ba4f52a88292585abff10fa6bfbfa&q=location%3ABratislava';

export const loadUsers = ({name, repos}) => {
    return fetch(url + (repos ? '+repos:>' + repos : '') + (name ? '+' + name + '+in%3Alogin' : ''))
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Network response was not ok.');
        });
}