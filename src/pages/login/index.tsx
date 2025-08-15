import React from 'react'
import {Button, Input, View} from "@tarojs/components";
import Taro from "@tarojs/taro"
import {setToken} from "@/util/auth";
import {handleLogin} from "@/api";


const Index = () => {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = React.useCallback(form => {

    if (!form.username) {
      Taro.showToast({
        icon:"none",
        title: "please enter your account"
      })
      return
    }
    /*if (!form.password) {
      Taro.showToast({
        icon:"none",
        title: "请输入密码"
      })
      return
    } */
    handleLogin(form).then(res => {

      setToken(res.data.token)
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }).catch((err) => {
      if (err.success === false) {
        Taro.showToast({
          title: err.message,
          duration: 3
        })
      }
    })
  }, [])

  // 页面加载自动调用login
  React.useEffect(() => {
    // 获取url参数
    const router = Taro.getCurrentInstance()
    const username = router?.router?.params?.user_id || ''
    login({ username, password })
    
  }, [username, password, login])

  return (
    <View className='pt-36'>
      <View className='text-center mb-10'>
        Support client
      </View>
      <div className={"flex items-center flex-col px-[30px]"} style={{border: "20px", borderColor: "black"}}>
        <View className={"mt-2 border-b border-gray-500 w-full"}>
          <Input
            placeholder={"account"}
            name='username' value={username} type='text'
            onInput={e => {
              setUsername(e.detail.value)
            }}
          />
        </View>
        <View className={"border-b border-gray-500 mt-4 w-full"} style={{border: "1px"}}>
          <Input name='password' value={password}
                 placeholder={"password"}
                 onInput={e => setPassword(e.detail.value)}
          />
        </View>
        <Button type='primary' className={"mt-4"}  formType='submit'  onClick={() => login({
          username, password
        })}
        >Login</Button>
      </div>

    </View>
  )
}

export default Index

