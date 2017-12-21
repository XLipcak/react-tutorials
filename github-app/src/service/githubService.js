const url = 'https://api.github.com/search/users?q=location%3ABratislava';

export const loadUsers = (name, repos) => {
    return fetch(url + (repos ? '+repos:>' + repos : '') + (name ? '+' + name + '+in%3Alogin' : ''))
        .then(res => res.json());
}