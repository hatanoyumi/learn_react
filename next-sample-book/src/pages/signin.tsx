import type { NextPage } from "next";
import { useRouter } from "next/router";
import AppLogo from "@/components/atoms/AppLogo";
import Box from "@/components/layout/Box";
import Flex from "@/components/layout/Flex";
import Layout from "@/components/templates/Layout";
import SigninFormConteiner from "@/containers/SigninFormConteiner";

const SigninPage: NextPage = () => {
  const router = useRouter()
  // 認証後のイベントハンドラ
  const handleSignin = async (err?: Error) => {
    ir (!err) {
      // サインインに成功し、クエリが指定されている場合はそのURLに移動。デフォルトはTOPページに移動
      const redurectTo = (router.query['redirect_to'] as string) ?? '/'

      console.log('Redirecting', redurectTo)
      await router.push(redurectTo)
    }
  }
}