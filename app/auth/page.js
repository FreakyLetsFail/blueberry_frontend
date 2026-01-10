"use client";

import { Tabs, Tab, Input, Button, Card, CardBody } from "@heroui/react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { EyeFilledIcon } from "../../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";

export default function AuthPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const passwordReqs = useMemo(() => {
    return {
      length: password.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const isPasswordValid = Object.values(passwordReqs).every(Boolean);
  const doPasswordsMatch = password === confirmPassword;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 font-sans">
      <div className="mb-10 flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z"
              fill="#3F51B5"
            />
            <circle cx="12" cy="13" r="3" fill="white" fillOpacity="0.2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Blueberry</h1>
      </div>

      <div className="w-full max-w-[380px]">
        <Tabs
          fullWidth
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          variant="underlined"
          classNames={{
            base: "mb-6",
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-zinc-800",
            cursor: "w-full bg-white",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-white text-zinc-500 font-medium transition-colors"
          }}
        >
          <Tab key="login" title="Login">
            <Card className="border-none bg-transparent shadow-none">
              <CardBody className="px-0 py-4 flex flex-col gap-6">
                <Input
                  type="email"
                  label="Email"
                  placeholder="name@university.edu"
                  labelPlacement="outside"
                  variant="bordered"
                  value={email}
                  onValueChange={setEmail}
                  isInvalid={isEmailInvalid}
                  color={isEmailInvalid ? "danger" : "default"}
                  classNames={{
                    label: "text-zinc-400 font-medium mb-1",
                    inputWrapper: "bg-zinc-950 border-zinc-800 hover:border-zinc-700 focus-within:!border-white rounded-xl h-12 transition-all",
                    input: "text-white placeholder:text-zinc-600",
                  }}
                />
                
                <Input
                  label="Password"
                  placeholder="••••••••"
                  labelPlacement="outside"
                  variant="bordered"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-xl text-zinc-500" />
                      ) : (
                        <EyeFilledIcon className="text-xl text-zinc-500" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  classNames={{
                    label: "text-zinc-400 font-medium mb-1",
                    inputWrapper: "bg-zinc-950 border-zinc-800 hover:border-zinc-700 focus-within:!border-white rounded-xl h-12 transition-all",
                    input: "text-white placeholder:text-zinc-600",
                  }}
                />

                <Button 
                  className="h-12 w-full rounded-xl bg-white font-bold text-black hover:bg-zinc-200 transition-colors mt-2"
                  onPress={() => router.push("/dashboard")}
                >
                  Sign in
                </Button>
                
                <p className="text-center text-sm text-zinc-500">
                  Don't have an account?{" "}
                  <button onClick={() => setSelected("sign-up")} className="text-white hover:underline underline-offset-4">
                    Sign up
                  </button>
                </p>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="sign-up" title="Register">
            <Card className="border-none bg-transparent shadow-none">
              <CardBody className="px-0 py-4 flex flex-col gap-5">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  labelPlacement="outside"
                  variant="bordered"
                  classNames={{
                    label: "text-zinc-400 font-medium mb-1",
                    inputWrapper: "bg-zinc-950 border-zinc-800 hover:border-zinc-700 focus-within:!border-white rounded-xl h-12",
                    input: "text-white placeholder:text-zinc-600",
                  }}
                />
                <Input
                  label="University Email"
                  placeholder="john@university.edu"
                  labelPlacement="outside"
                  variant="bordered"
                  classNames={{
                    label: "text-zinc-400 font-medium mb-1",
                    inputWrapper: "bg-zinc-950 border-zinc-800 hover:border-zinc-700 focus-within:!border-white rounded-xl h-12",
                    input: "text-white placeholder:text-zinc-600",
                  }}
                />
                
                <div className="flex flex-col gap-3">
                  <Input
                    label="Password"
                    placeholder="••••••••"
                    labelPlacement="outside"
                    variant="bordered"
                    value={password}
                    onValueChange={setPassword}
                    type={isVisible ? "text" : "password"}
                    classNames={{
                      label: "text-zinc-400 font-medium mb-1",
                      inputWrapper: "bg-zinc-950 border-zinc-800 hover:border-zinc-700 focus-within:!border-white rounded-xl h-12",
                      input: "text-white placeholder:text-zinc-600",
                    }}
                  />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-1">
                    <Requirement met={passwordReqs.length} text="8+ Characters" />
                    <Requirement met={passwordReqs.lower} text="Lowercase" />
                    <Requirement met={passwordReqs.upper} text="Uppercase" />
                    <Requirement met={passwordReqs.number} text="Number" />
                    <Requirement met={passwordReqs.special} text="Symbol" />
                  </div>
                </div>

                <Input
                  label="Confirm Password"
                  placeholder="••••••••"
                  labelPlacement="outside"
                  variant="bordered"
                  value={confirmPassword}
                  onValueChange={setConfirmPassword}
                  isInvalid={confirmPassword && !doPasswordsMatch}
                  type="password"
                  classNames={{
                    label: "text-zinc-400 font-medium mb-1",
                    inputWrapper: "bg-zinc-950 border-zinc-800 hover:border-zinc-700 focus-within:!border-white rounded-xl h-12",
                    input: "text-white placeholder:text-zinc-600",
                  }}
                />

                <Button 
                  isDisabled={!isPasswordValid || !doPasswordsMatch}
                  className="h-12 w-full rounded-xl bg-white font-bold text-black hover:bg-zinc-200 transition-colors mt-2"
                >
                  Create account
                </Button>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

function Requirement({ met, text }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-1 w-1 rounded-full ${met ? "bg-white" : "bg-zinc-800"}`} />
      <span className={`text-[11px] uppercase tracking-wider font-bold ${met ? "text-white" : "text-zinc-600"}`}>
        {text}
      </span>
    </div>
  );
}
