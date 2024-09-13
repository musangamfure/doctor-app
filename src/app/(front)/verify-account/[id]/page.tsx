import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "../../../../../actions/users";
import VerifyTokenForm from "@/components/VerifyTokenForm";

export default async function VerifyAccount({
  params: { id },
}: {
  params: { id: string };
}) {
  //Get a User
  const user = await getUserById(id);
  const userToken = user && "token" in user ? user.token : undefined;
  return (
    <div className="min-h-screen dark:bg-black flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Verification Token</CardTitle>
          <CardDescription className="">
            Please Check Your Email:{" "}
            <span className="dark:text-white font-semibold mx-1">
              {user && "email" in user ? user.email : ""}
            </span>
            and Enter the code we sent there
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyTokenForm userToken={userToken} id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
