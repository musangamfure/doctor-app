import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "../../../../../actions/users";
import VerifyTokenForm from "@/components/VerifyTokenForm";
import TrackingForm from "./TrackingForm";

export default async function VerifyAccount({
  params: { id },
}: {
  params: { id: string };
}) {
  //Get a User
  const user = await getUserById(id);
  const userToken = user && "token" in user ? user.token : undefined;
  const role = user && "role" in user ? user.role : undefined;
  const plan =
    user && "plan" in user ? (user.plan as string | undefined) : undefined;

  return (
    <div className="min-h-screen dark:bg-black flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Resume Your Application</CardTitle>
          <CardDescription className="">
            Please enter the 10-Character tracking number that was given to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrackingForm />
        </CardContent>
      </Card>
    </div>
  );
}
