import { useState } from "react";

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

const PlaygroundCard = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!audioFile) {
      alert("Please select an audio file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    /* Write code for api calling */
  };

  return (
    <Card className="w-[350px]" style={{ borderRadius: "15px" }}>
      <CardHeader>
        <CardTitle>Audio Learning</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-2">
                Upload audio
              </Label>
              <Input
                id="audio"
                accept="audio/*"
                type="file"
                onChange={handleFileChange}
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
        <Button
          variant="outline"
          className="bg-green-600 rounded-full"
          type="submit"
        >
          Learn
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaygroundCard;
