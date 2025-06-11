import {connect} from 'net'

const socket = connect(8000, 'localhost')

socket
    .on('error', console.error)
    .on('connect', () => console.log('Connected to the listening socket.'))