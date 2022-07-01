import { FC, useCallback } from "react";
import Image from "next/image";
import { Button, Text } from "@nextui-org/react";

import Clipboard from "assets/clipboard.svg";
import { copyToClipboard } from "utils/clipboard";

interface CopyToClipboardProps {
  currentIcon: string;
}

export const CopyToClipboard: FC<CopyToClipboardProps> = ({ currentIcon }) => {
  const onCopyClick = useCallback(() => {
    copyToClipboard(currentIcon);
  }, [currentIcon]);

  return (
    <Button light onPress={onCopyClick}>
      <Image src={Clipboard} alt="Copy to clipboard" />
      <Text
        color="#6D6D6D"
        css={{
          marginLeft: "0.5rem !important",
        }}
      >
        Copy to clipboard
      </Text>
    </Button>
  );
};
