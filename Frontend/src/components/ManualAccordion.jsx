import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ManualAccordion() {
  return (
    <div className="max-w-3xl ml-8 mt-8">
      {" "}
      {/* Left-aligned with some margin */}
      <Accordion type="single" collapsible className="space-y-4">
        {/* How to clone your voice */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            How to clone my voice?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              To clone your voice, simply follow these steps:
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Record a clear sample of your voice using the microphone.
                </li>
                <li>
                  Upload the recorded audio in the "Voice Settings" section.
                </li>
                <li>
                  Adjust the tone, pitch, and pace to match the desired voice.
                </li>
                <li>Click on "Start Cloning" to generate your cloned voice.</li>
              </ol>
              After the process is complete, you'll be able to use your cloned
              voice for various features in the app!
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* How to adjust tone */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
            How to adjust the tone of my voice?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              To adjust the tone of your voice, navigate to the "Voice Settings"
              tab. Here you can modify the tone, pitch, and modulation of your
              voice. Use the sliders to experiment with different settings until
              you achieve the desired effect.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Upload multiple voice samples */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
            Can I upload multiple voice samples?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Yes, you can upload multiple voice samples. This allows you to
              create a more diverse range of voices by training the system with
              different recordings. Each sample will contribute to the accuracy
              of the voice cloning process.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Supported formats */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">
            What formats are supported for voice input?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              The following formats are supported for voice input:
              <ul className="list-disc pl-6 space-y-2">
                <li>MP3</li>
                <li>WAV</li>
                <li>OGG</li>
                <li>FLAC</li>
              </ul>
              Ensure the file is clear and of high quality for the best cloning
              results.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Deleting saved voices */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">
            How do I delete my saved voices?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              To delete a saved voice, go to the "My Voices" section in the app,
              select the voice you want to remove, and click on the "Delete"
              button next to it.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Resetting account settings */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg font-semibold">
            How to reset my account settings?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              To reset your account settings, navigate to "Account Settings" and
              click on the "Reset Settings" button. This will reset your
              preferences but not your saved voices or history.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* How to change voice speed */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-lg font-semibold">
            How to change the speed of my cloned voice?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              To change the speed, go to the "Voice Settings" page and adjust
              the speed slider. You can make the voice faster or slower based on
              your preferences.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* How to share my cloned voice? */}
        <AccordionItem value="item-8">
          <AccordionTrigger className="text-lg font-semibold">
            How to share my cloned voice?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Once you have generated your cloned voice, go to the "My Voices"
              section. You will find a "Share" button next to your saved voices
              that allows you to share them directly with others via email,
              social media, or by generating a download link.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* How to download my cloned voice? */}
        <AccordionItem value="item-9">
          <AccordionTrigger className="text-lg font-semibold">
            How to download my cloned voice?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              To download your cloned voice, go to the "My Voices" section, find
              the cloned voice you want to download, and click the "Download"
              button. The file will be saved in your chosen format.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Troubleshooting voice cloning */}
        <AccordionItem value="item-10">
          <AccordionTrigger className="text-lg font-semibold">
            What should I do if my voice cloning doesn't work?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              If you're having trouble, try the following steps:
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Ensure your voice recording is clear and free from background
                  noise.
                </li>
                <li>Check the microphone settings on your device.</li>
                <li>
                  Make sure the voice sample is long enough for accurate
                  cloning.
                </li>
              </ol>
              If the issue persists, contact customer support for assistance.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ManualAccordion;
