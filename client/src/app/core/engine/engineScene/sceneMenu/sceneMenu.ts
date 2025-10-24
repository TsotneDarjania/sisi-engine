import { Container, ContainerChild, Text } from "pixi.js";

export class SceneMenu {
  private sceneNameText!: Text;
  private sceneName: string = "default";

  constructor(
    private stage: Container<ContainerChild>,
    public width: number,
    public height: number
  ) {
    this.init();
  }

  private init() {
    this.addSceneNameText();
  }

  private addSceneNameText() {
    this.sceneNameText = new Text({
      text: `${this.sceneName} (scene)`,
    });
    this.sceneNameText.style.fill = "white";
    this.sceneNameText.style.fontSize = "24px";
    this.sceneNameText.style.fontFamily = "sanscodefont";

    this.sceneNameText.anchor = 0.5;
    this.sceneNameText.x = this.width / 2;
    this.sceneNameText.y = 30;

    this.stage.addChild(this.sceneNameText);
  }

  public onResize(newWidth: number, _newHeight: number) {
    this.sceneNameText.position.set(newWidth / 2);
    this.sceneNameText.y = 30;
  }
}
