const fetchApi = require("./fetchApi");
const {jiraTransition} = require("../variables");
const Task = require("../model/task")
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = {
    jira: {
        headers: {
            'Authorization': `Basic ${Buffer.from(
                `bn0225@gmail.com:${process.env.JIRA_TOKEN}`
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        getTask: async function ({id = null}){
            if(id){
                return await fetchApi({
                    url: `https://myworkdoneweb.atlassian.net/rest/api/3/issue/${id}`,
                    method: "GET",
                    headers: this.headers
                })
            }
            else {
                let res = await fetchApi({
                    url: `https://myworkdoneweb.atlassian.net/rest/api/3/search?jql=project=10000`,
                    method: "GET",
                    headers: this.headers
                })
                return res.issues
            }
        },
        createTask: async function({summary, description}){
            const body = {
                "fields": {
                    "project": {
                        "id": "10000"
                    },
                    "issuetype": {
                        "id": "10001"
                    },
                    "description": {
                        "content": [
                            {
                                "content": [
                                    {
                                        "text": description,
                                        "type": "text"
                                    }
                                ],
                                "type": "paragraph"
                            }
                        ],
                        "type": "doc",
                        "version": 1
                    },
                    "summary": summary
                },
                "transition": {
                    "id": "11",
                    "looped": true
                }
            };
            return await fetchApi({
                url: `https://myworkdoneweb.atlassian.net/rest/api/3/issue`,
                method: "POST",
                headers: this.headers,
                body: body
            })
        },
        updateTask: async function({status, id}){
            const body = {
                "transition": {
                    "id": jiraTransition[status],
                }
            };
            return await fetchApi({
                url: `https://myworkdoneweb.atlassian.net/rest/api/3/issue/${id}/transitions`,
                method: "POST",
                headers: this.headers,
                body: body
            })
        },
        deleteTask: async function({id}){
            return await fetchApi({
                url: `https://myworkdoneweb.atlassian.net/rest/api/3/issue/${id}`,
                method: "DELETE",
                headers: this.headers,
            })
        }
    },
    asana: {
        headers: {
            'Authorization': `Bearer ${process.env.ASANA_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        getTask: async function ({id = null}){
            if(id){
                let res = await fetchApi({
                    url: `https://app.asana.com/api/1.0/tasks/${id}`,
                    method: "GET",
                    headers: this.headers
                })
                return res.data
            }
            else {
                let res = await fetchApi({
                    url: `https://app.asana.com/api/1.0/projects/1204475989213577/tasks?opt_fields=completed,name,notes`,
                    method: "GET",
                    headers: this.headers
                })
                return res.data
            }
        },
        createTask: async function({name, notes}){
            const body = {
                "data": {
                    "projects": [
                        "1204475989213577"
                    ],
                    "name": name,
                    "notes": notes,
                    "assignee": "1204475676614286",
                    "workspace": "1204475676614296"
                }
            };
            let res = await fetchApi({
                url: `https://app.asana.com/api/1.0/tasks?opt_fields=name,notes,completed`,
                method: "POST",
                headers: this.headers,
                body: body
            })
            return {id: res.data.gid}
        },
        updateTask: async function({status, id}){
            console.log(status, id);
            const body = {
                "data": {"completed": status}
            };
            console.log(body)
            let res =  await fetchApi({
                url: `https://app.asana.com/api/1.0/tasks/${id}?opt_fields=completed,name,notes`,
                method: "PUT",
                headers: this.headers,
                body: body
            })
            console.log(res);
            return {id: res.data.gid}
        },
        deleteTask: async function({id}){
            let res = await fetchApi({
                url: `https://app.asana.com/api/1.0/tasks/${id}?opt_fields=gid`,
                method: "DELETE",
                headers: this.headers,
            })
            return {id: res.data.gid}
        }
    },
    cubyts: {
        getTask: async function ({id = null}){
            if(id){
                try {
                    const objectId = new ObjectId(id)
                    console.log(objectId);
                    return Task.findOne({_id: objectId})
                }
                catch (error){
                    console.log(`Could not fetch admins ${error}`)
                }
            }
            else {
                try {
                    const res = await Task.find({})
                    console.log(res);
                    return await Task.find({});
                } catch (error) {
                    console.log(`Could not fetch admins ${error}`)
                }
            }
        },
        createTask: async function({name, description}){
            const data = {
                name: name,
                description: description,
                status: false,
                user: "Biswajit Nayak"
            }
            const res = await Task.create(data);
            return {id: res._id}
        },
        updateTask: async function({status, id}){
            const data = {
                status: status,
            }
            const objectId = new ObjectId(id)
            let res = await Task.findOneAndUpdate({_id: objectId}, data);

            return {id: res._id}
        },
        deleteTask: async function({id}){
            const objectId = new ObjectId(id)
            const res = await Task.deleteOne({ _id: objectId})
            return {id: res._id}
        }
    }
}