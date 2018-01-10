const tokenParam = 'access_token=xxx';
const usersUrl = 'https://api.github.com/search/users?' + tokenParam + '&q=location%3ABratislava';
const userDetailUrl = 'https://api.github.com/users/';

export const loadUsers = ({name, repos}) => {
    return fetch(usersUrl + (repos ? '+repos:>' + repos : '') + (name ? '+' + name + '+in%3Alogin' : ''))
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Network response was not ok.');
        });
}

export const loadUserDetail = (id) => {
    return fetch(userDetailUrl + id + '?' + tokenParam)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Network response was not ok.');
        });
}