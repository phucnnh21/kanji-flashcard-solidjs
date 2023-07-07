import { DEFAULT_SWIPE_DISTANCE, appConfig, levelList } from "@/configs";
import { Input } from "@/shared/components";
import { FormValidation, required, useForm } from "@/shared/hooks";
import { Component, For } from "solid-js";
import { LevelSwitch } from "@/modules/home";
import { StorageHelper } from "@/shared/utils";
import { AppConfig } from "@/shared/types";

const initialValues: AppConfig = {
  ...appConfig,
  swipeDistance: DEFAULT_SWIPE_DISTANCE,
};

export const HomeContainer: Component<{}> = () => {
  const { register, onSubmit } = useForm<AppConfig>({
    handleSubmit,
    validation,
    initialValues,
  });
  function handleSubmit(values: AppConfig) {
    StorageHelper.setItem("appConfig", values);
    StorageHelper.setItem("swipeDistance", parseInt(`${values.swipeDistance}`));
  }

  function handleSave() {
    onSubmit();
  }

  return (
    <form
      class="flex w-full h-full p-5 flex-col items-center space-y-6"
      onSubmit={onSubmit}
    >
      <h3 class="font-bold text-2xl">Kanji Flashcard</h3>
      <For each={levelList}>
        {(level) => <LevelSwitch level={level} register={register} />}
      </For>
      <Input
        label="App swipe distance detect"
        {...register("swipeDistance")}
        type="number"
        class="w-full"
        inputClass="input-md"
      />
      <div class="flex flex-row items-center rounded w-full justify-center space-x-5">
        <button type="button" class="btn btn-secondary" onClick={handleSave}>
          Save
        </button>
        <button type="button" class="btn btn-primary">
          Save and start
        </button>
      </div>
    </form>
  );
};

const validation: FormValidation<any> = {
  swipeDistance: [
    {
      validator: required,
      errorMessage: "Swipe distance is required!",
    },
    {
      validator: (value: number) => value > 0,
      errorMessage: "Swipe distance must be bigger than 0!",
    },
  ],
};
