class MyEventEmitter{
  constructor(){
    // Register 
    this.eventListeners={}
  }

  on(event , listener){
    if(!this.eventListeners[event]){
      this.eventListeners[event]=[]
    }
    this.eventListeners[event].push(listener)
    return true
  }

  emit(event , ...args){
    if(!this.eventListeners[event]){
      return false
    }
    const listeners= this.eventListeners[event]
    listeners.forEach((listener)=> listener(...args))
  }

  off(event , listener){
    if(!this.eventListeners[event]){
      return false
    }

    const index = this.eventListeners[event].indexOf(listener)
    if(index<0){
      return false
    }

    this.eventListeners[event].splice(index,1)

  }

  // run only once
  once (event , listener){
    const wrapperFunc = (...args)=>{
      listener(...args)
      this.off(event, wrapperFunc)
    }
    this.on(event, wrapperFunc)
    return true
  }
}

const e = new MyEventEmitter()

const sendMessage = (username)=> console.log('Message to :' , username)
e.on('user:signup', (username)=> console.log('User Signup'))
e.on('user:signup', sendMessage)

e.emit('user:signup' , 'nitin')