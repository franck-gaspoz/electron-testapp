
const versions = app.dependencies
const text = `This app is using Chrome (v${versions.chrome}), Node.js (v${versions.node}), and Electron (v${versions.electron})`
console.log(text)
const information = document.getElementById('info')
if (information) information.innerText = text

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}
func()
