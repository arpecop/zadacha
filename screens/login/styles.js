import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorbox: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    bottom: 0,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    position: 'absolute',
    textAlign: 'center',
    width: '80%',
  },
  errorboxText: { color: 'red', fontSize: 12, fontStyle: 'italic', padding: 5 },
  forgot: {
    color: 'black',
    fontSize: 11,
  },
  image: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  inputText: {
    color: 'white',
    height: 50,
  },
  inputView: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    padding: 20,
    width: '80%',
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#fb5b5a',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 40,
    width: '80%',
  },
  loginText: {
    color: 'black',
  },
  logo: {
    color: 'black',
    fontSize: 50,
    fontWeight: '100',
    marginBottom: 40,
  },
})
export default styles
