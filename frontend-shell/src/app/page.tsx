'use client'
import { CustomSwitchTheme } from "@/shared/components/CustomSwitchTheme";
import { Button, TextInput, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Title>lam</Title>
      <Button component={Link} href="/pages/demo">
        Next link button
      </Button>
    </>
  );
}
