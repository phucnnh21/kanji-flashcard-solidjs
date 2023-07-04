import { IconTrash, Input } from "@/shared/components";
import { FormRegister } from "@/shared/hooks";
import { Accessor, Component } from "solid-js";
import { KanjiInputGroupWrapper } from ".";

export const KanjiExampleInputGroup: Component<{
  id: string | number;
  formPath: string;
  index: Accessor<number>;
  register: FormRegister;
  onDeleteClick: (params: any) => void;
}> = (props) => {
  return (
    <div class="border p-4 space-y-4 rounded-sm">
      <div class="flex flex-row w-full items-center justify-between">
        <span class="font-bold">Example #{props.index() + 1}</span>
        <IconTrash
          onClick={() => props.onDeleteClick(props.id)}
          class="cursor-pointer text-slate-600 hover:text-slate-800"
        />
      </div>
      <KanjiInputGroupWrapper>
        <Input
          label={`Word`}
          {...props.register(`${props.formPath}.${props.index()}.word`)}
          className="w-1/2"
        />
        <Input
          label={`Furigana`}
          {...props.register(`${props.formPath}.${props.index()}.furigana`)}
          className="w-1/2"
        />
      </KanjiInputGroupWrapper>
      <KanjiInputGroupWrapper>
        <Input
          label={`Meaning`}
          {...props.register(`${props.formPath}.${props.index()}.meaning`)}
          className="w-1/2"
        />
        <Input
          label={`Meaning kanji`}
          {...props.register(`${props.formPath}.${props.index()}.meaningKanji`)}
          className="w-1/2"
        />
      </KanjiInputGroupWrapper>
    </div>
  );
};