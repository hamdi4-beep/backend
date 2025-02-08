import { connect } from "net";

const socket = connect(3000)
console.log(socket)

socket.end()