import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class PacmanGame extends JPanel implements ActionListener {
    private Timer timer;
    private int pacmanX = 50, pacmanY = 50;
    private int pacmanSize = 30;
    private int pacmanSpeed = 5;
    private int directionX = 0, directionY = 0;

    public PacmanGame() {
        timer = new Timer(30, this);
        timer.start();
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                int key = e.getKeyCode();
                if (key == KeyEvent.VK_LEFT) { directionX = -pacmanSpeed; directionY = 0; }
                if (key == KeyEvent.VK_RIGHT) { directionX = pacmanSpeed; directionY = 0; }
                if (key == KeyEvent.VK_UP) { directionY = -pacmanSpeed; directionX = 0; }
                if (key == KeyEvent.VK_DOWN) { directionY = pacmanSpeed; directionX = 0; }
            }
        });
        setFocusable(true);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.BLACK);
        g.fillRect(0, 0, getWidth(), getHeight());
        g.setColor(Color.YELLOW);
        g.fillArc(pacmanX, pacmanY, pacmanSize, pacmanSize, 30, 300);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        pacmanX += directionX;
        pacmanY += directionY;
        repaint();
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Pacman Game");
        PacmanGame game = new PacmanGame();
        frame.add(game);
        frame.setSize(500, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
