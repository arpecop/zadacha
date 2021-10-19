import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    fontWeight: '100',
    fontSize: 50,
    color: 'black',
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 20,
    height: 40,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: 'black'
  },
  forgot: {
    color: 'black',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'black'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default styles
