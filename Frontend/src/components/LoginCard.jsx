import * as React from "react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginCard = () => {
  return (
    <Card className="w-[350px]" style={{ borderRadius: "15px" }}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                className="rounded-full"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          to="/"
          className="inline-block"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Button variant="outline" className="bg-red-500 rounded-full">
            Cancel
          </Button>
        </Link>
        <Button variant="outline" className="bg-green-600 rounded-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
